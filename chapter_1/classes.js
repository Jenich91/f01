/*
У экземпляра класса должны присутствовать св-ва:
-name string.
-grade string Для простоты предположим, что система грейдов будет иметь значения от L1 до L4.
-hardSkills string[].
-company string.

Так же должны иметься три метода:

-changeCompany(newCompanyName) - сотрудник может сменить компанию, либо же просто уволиться.
-upGrade() - сотрудник может повысить квалификацию.
-addSkill(newSkillName) - сотрудник может дополнить список своих скиллов.
*/

import { grade, checkType, checkArrayType } from './commonLib.js';

export class Employee {
  #name;
  #grade;
  #hardSkills;
  #company;

  constructor(name, grade, hardSkills, company) {
    if (
      !checkType(name, String) ||
      !checkType(grade, String) ||
      !checkArrayType(hardSkills, String) ||
      !checkType(company, String)
    )
      throw new Error('Invalid type of one of the arguments!');

    this.#name = name;
    this.#grade = grade;
    this.#hardSkills = hardSkills;
    this.#company = company;
  }

  changeCompany(newCompanyName) {
    if (!checkType(newCompanyName, String))
      throw new Error('Invalid argument type!');

    this.#company = newCompanyName;
  }

  upGrade() {
    if (this.#grade === grade.L1) {
      this.#grade = grade.L2;
      return;
    }

    if (this.#grade === grade.L2) {
      this.#grade = grade.L3;
      return;
    }
    if (this.#grade === grade.L3) {
      this.#grade = grade.L4;
      return;
    }
  }

  addSkill(newSkillName) {
    if (!checkType(newSkillName, String))
      throw new Error('Invalid argument type!');

    this.#hardSkills.push(newSkillName);
  }

  toString() {
    return `
    Employee:
    name:${this.#name}
    grade:${this.#grade}
    hardSkills:${this.#hardSkills.toString()}
    company:${this.#company}
    `;
  }

  getGrade() {
    return this.#grade;
  }
}
