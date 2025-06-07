import { test as _test } from "@playwright/test";
import type {
  PlaywrightTestArgs,
  PlaywrightWorkerArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerOptions,
  TestInfo,
} from "@playwright/test";

type PlaywrightTestHandler = (
  args: PlaywrightTestArgs &
    PlaywrightTestOptions &
    PlaywrightWorkerArgs &
    PlaywrightWorkerOptions,
  testInfo: TestInfo,
  // setContext: (s:ContextSetter) => void
) => Promise<void>;
type TestContext = {
  orgIds: string[];
  userEmails: string[];
};
type ContextSetter = (context: TestContext) => TestContext;

export type TestArgs = PlaywrightTestArgs &
  PlaywrightTestOptions &
  PlaywrightWorkerArgs &
  PlaywrightWorkerOptions;

export class TestChain {
  name: string;
  context: TestContext;
  constructor(
    name: string,
    context: TestContext = { orgIds: [], userEmails: [] },
  ) {
    this.name = name;
    this.context = context;
  }

  setContext(setter: ContextSetter) {
    this.context = setter(this.context);
  }

  series(
    name: string,
    handler: (chain: TestChain, setContext: (s: ContextSetter) => void) => void,
  ) {
    // `${this.name} -- ${name}`
    _test.describe.serial(name, () =>
      handler(new TestChain(`${this.name} -- ${name}`), this.setContext),
    );
    return this;
  }

  parallel(
    name: string,
    handler: (chain: TestChain, setContext: (s: ContextSetter) => void) => void,
  ) {
    // `${this.name} << ${name}`
    _test.describe.parallel(name, () =>
      handler(new TestChain(`${this.name} >> ${name}`), this.setContext),
    );
    return this;
  }

  test(name: string, handler: PlaywrightTestHandler, setter?: ContextSetter) {
    // `${this.name} .. ${name}`
    _test(name, handler);
    setter && _test(`${name}._set`, () => this.setContext(setter));
    return this;
  }

  end(handler: (context: TestContext) => Promise<void>) {
    _test.afterAll(async () => {
      await handler(this.context);
    });
  }
}
