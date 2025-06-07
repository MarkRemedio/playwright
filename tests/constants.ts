import { faker } from "@faker-js/faker";

export function makeUser(context?: { orgId: string; tenantId?: string }) {
  return {
    ...context,
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    displayName: faker.person.firstName(),
    email: faker.internet
      .email({ provider: "test.wombat.software" })
      .toLowerCase(),
    password: faker.internet.password(),
  };
}

export const orgAdmin = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  displayName: faker.person.firstName(),
  email: "automation-org@test.wombat.software".toLowerCase(),
  password: "ISDo_iSHVGXQ",
  orgId: "RSPAUORP",
  orgName: faker.company.name(),
};

export const orgUser = makeUser({
  orgId: "RSPAUORP",
});

export const tenantAdmin = {
  active: true,
  lastName: "Cormier",
  firstName: "Rusty",
  displayName: "Consuelo",
  email: "admin@test.wombat.software".toLowerCase(),
  password: "rnWeAmys1EeI3_F",
};

// export const tenantAdmin = makeUser();
// console.log(JSON.stringify(tenantAdmin));
export const tenantReadUser = {
  active: true,
  lastName: "Ankunding",
  firstName: "Aidan",
  displayName: "Juana",
  email: "readonly@test.wombat.software".toLowerCase(),
  password: "c2sbqw5D1s6aPjf",
};

// export const tenantReadUser = makeUser();
// console.log(JSON.stringify(tenantReadUser));
export const tenantQueryUsersUser = {
  active: true,
  lastName: "Lind",
  firstName: "Zachariah",
  displayName: "Rodrick",
  email: "tenantquery@test.wombat.software".toLowerCase(),
  password: "L25XSxLdIDBTDVt",
};

// export const tenantQueryUsersUser = makeUser();
// console.log(JSON.stringify(tenantQueryUsersUser));
export const tenantManageFormsUser = {
  active: true,
  lastName: "Klein",
  firstName: "Dexter",
  displayName: "Abbie",
  email: "tenantmanageform@test.wombat.software".toLowerCase(),
  password: "wHS3CuYmg4fuSkk",
};

// export const tenantManageFormsUser = makeUser();
// console.log(JSON.stringify(tenantManageFormsUser));
export const tenantManagePeopleUser = {
  active: true,
  lastName: "Rosenbaum",
  firstName: "Aliza",
  displayName: "Osvaldo",
  email: "tenantmanagepeople@test.wombat.software".toLowerCase(),
  password: "TEX9pgav5kVVfkg",
};

// export const tenantManagePeopleUser = makeUser();
// console.log(JSON.stringify(tenantManagePeopleUser));
export const tenantManageDocumentsUser = {
  active: true,
  lastName: "Shields",
  firstName: "Delta",
  displayName: "Ladarius",
  email: "tenantmanagedocuments@test.wombat.software".toLowerCase(),
  password: "hGkgyqsTboHU0CC",
};

export const fakeClient = (() => {
  const companyname = faker.company.name();
  return {
    companyname,
    shortName: companyname
      .toUpperCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-"),
    timezone: "Canada/Mountain",
  };
})();

// export const tenantManageDocumentsUser = makeUser();
// console.log(JSON.stringify(tenantManageDocumentsUser));
