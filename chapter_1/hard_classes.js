import { Employee } from './classes.js';
import { grade, checkType, checkArrayType } from './commonLib.js';

/*
companyName - string
currentProjects - Массив экземпляров класса Project
completedProjects -  Массив экземпляров класса Project
staff - {
    developers :  {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса DackendDeveloper
    },
    managers: массив содержащий экземпляры класса Manager
}
addNewCompanyMember(Developer/Manager) - в кач-ве аргумента принимает экземляр класса FrontendDeveloper, Backend Developer или Manager
addProject(Project) - в кач-ве аргумента принимает экземляр класса Project
getMembersQuantity()
*/
export class Company {
  #companyName;
  #currentProjects;
  #completedProjects;
  #staff;

  constructor(companyName, currentProjects, completedProjects, staff) {
    let isStaff =
      checkArrayType(staff.managers, Manager) &&
      checkArrayType(staff.developers.frontend, FrontendDeveloper) &&
      checkArrayType(staff.developers.backend, BackendDeveloper);
    if (
      !checkType(companyName, String) ||
      !checkArrayType(currentProjects, Project) ||
      !checkArrayType(completedProjects, Project) ||
      !isStaff
    )
      throw new Error('Invalid type of one of the arguments!');

    this.#companyName = companyName;
    this.#currentProjects = currentProjects;
    this.#completedProjects = completedProjects;
    this.#staff = staff;
  }

  addNewCompanyMember(member) {
    if (checkType(member, FrontendDeveloper)) {
      this.#staff.developers.frontend.push(member);
      return;
    }

    if (checkType(member, BackendDeveloper)) {
      this.#staff.developers.backend.push(member);
      return;
    }

    if (checkType(member, Manager)) {
      this.#staff.managers.push(member);
      return;
    }

    throw new Error('Invalid type of one of the arguments!');
  }

  addProject(project) {
    if (!checkType(project, Project))
      throw new Error('Invalid type of one of the arguments!');
    this.#currentProjects.push(project);
  }

  getMembersQuantity() {
    return (
      this.#staff.managers.length +
      this.#staff.developers.frontend.length +
      this.#staff.developers.backend.length
    );
  }

  toString() {
    return `
    Company:
    companyName: ${this.#companyName}
    currentProjects: ${this.#currentProjects}
    completedProjects: ${this.#completedProjects}
    staff.managers: ${this.#staff.managers}
    staff.developers.frontend: ${this.#staff.developers.frontend}
    staff.developers.backend: ${this.#staff.developers.backend} 
  `;
  }
}

/*
- projectName - string
- minQualification -string
- team -  {
    manager : экземпляр класса Manager
    developers: {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса BackendDeveloper
    }
}
addNewProjectMember(Developer) - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.
*/
export class Project {
  #projectName;
  #minQualification;
  #team;

  constructor(projectName, minQualification, team) {
    let isTeam =
      checkType(team.manager, Manager) &&
      checkArrayType(team.developers.backend, BackendDeveloper) &&
      checkArrayType(team.developers.frontend, FrontendDeveloper);

    if (
      !checkType(projectName, String) ||
      !checkType(minQualification, String) ||
      !isTeam
    )
      throw new Error('Invalid type of one of the arguments!');

    this.#projectName = projectName;
    this.#minQualification = minQualification;
    this.#team = team;
  }

  completeProject() { }

  addNewProjectMember(developer) {
    if (this.#team.manager.checkMember(this.#minQualification, developer)) {
      if (checkType(developer, BackendDeveloper))
        this.#team.developers.backend.push(developer);
      else this.#team.developers.frontend.push(developer);
    }
  }

  toString() {
    return `
    Project:
    projectName: ${this.#projectName}
    minQualification: ${this.#minQualification}
    team.manager: ${this.#team.manager}
    team.developers.frontend: ${this.#team.developers.frontend}
    team.developers.backend: ${this.#team.developers.backend}
  `;
  }
}

/*
projectQuantity - number
checkMember(minQualification, member) - в качестве аргумента принимается строка ('L1'/'L2'/'L3'/'L4') и BackendDeveloper || FrontendDeveloper
*/
export function fromGradeToNumber(grade_value) {
  if (grade_value == grade.L1) return 1;
  if (grade_value == grade.L2) return 2;
  if (grade_value == grade.L3) return 3;
  if (grade_value == grade.L4) return 4;
}

export class Manager extends Employee {
  #projectQuantity;

  constructor(name, grade, hardSkills, company, projectQuantity) {
    super(name, grade, hardSkills, company);

    if (!checkType(projectQuantity, Number))
      throw new Error('Invalid argument type!');
    this.#projectQuantity = projectQuantity;
  }

  checkMember(minQualification, member) {
    if (
      !checkType(minQualification, String) ||
      !(
        checkType(member, FrontendDeveloper) ||
        checkType(member, BackendDeveloper)
      )
    )
      throw new Error('Invalid argument type!');
    return (
      fromGradeToNumber(member.getQualification()) >=
      fromGradeToNumber(minQualification)
    );
  }

  toString() {
    return `
    Manager:
    ${super.toString()}
    ${this.#projectQuantity}`;
  }
}

/*
stack - массив строк
- developerSide - строка ('frontend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/
export class FrontendDeveloper extends Employee {
  #stack;
  #developerSide;
  #projectQuantity;

  constructor(
    name,
    grade,
    hardSkills,
    company,
    stack,
    developerSide,
    projectQuantity
  ) {
    super(name, grade, hardSkills, company);

    if (
      !checkArrayType(stack, String) &&
      !checkType(developerSide, String) &&
      !checkType(projectQuantity, Number)
    )
      throw new Error('Invalid type of one of the arguments!');

    if (developerSide != 'frontend')
      throw new Error('The argument "developerSide" must be "frontend!"');

    this.#stack = stack;
    this.#developerSide = developerSide;
    this.#projectQuantity = projectQuantity;
  }

  expandStack(newTech) {
    if (!checkType(newTech, String)) throw new Error('Invalid argument type!');
    this.#stack.push(newTech);
  }

  getQualification() {
    return super.getGrade();
  }

  toString() {
    return `
    FrontendDeveloper:
    ${super.toString()}
    stack:${this.#stack.toString()}
    developerSide:${this.#developerSide}
    projectQuantity:${this.#projectQuantity}
    `;
  }
}

/*
stack - массив строк
- developerSide - строка ('backend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/
export class BackendDeveloper extends Employee {
  #stack;
  #developerSide;
  #projectQuantity;

  constructor(
    name,
    grade,
    hardSkills,
    company,
    stack,
    developerSide,
    projectQuantity
  ) {
    super(name, grade, hardSkills, company);

    if (
      !checkArrayType(stack, String) &&
      !checkType(developerSide, String) &&
      !checkType(projectQuantity, Number)
    )
      throw new Error('Invalid type of one of the arguments!');

    if (developerSide != 'backend')
      throw new Error('The argument "developerSide" must be "backend!"');

    this.#stack = stack;
    this.#developerSide = developerSide;
    this.#projectQuantity = projectQuantity;
  }

  expandStack(newTech) {
    if (!checkType(newTech, String)) throw new Error('Invalid argument type!');
    this.#stack.push(newTech);
  }

  getQualification() {
    return super.getGrade();
  }

  toString() {
    return `
    BackendDeveloper:
    ${super.toString()}
    stack:${this.#stack.toString()}
    developerSide:${this.#developerSide}
    projectQuantity:${this.#projectQuantity}
    `;
  }
}
