import { grade, makeTeam, makeStaff } from './commonLib.js';
import { Employee } from './classes.js';
import {
  FrontendDeveloper,
  BackendDeveloper,
  Manager,
  Project,
  Company,
} from './hard_classes.js';

{
  let employee = new Employee(
    'Tom',
    grade.L1,
    Array('html', 'css', 'js'),
    'Sber'
  );
  console.log(employee.toString());
  employee.changeCompany('Yandex');
  console.log(employee.toString());
  employee.upGrade();
  employee.upGrade();
  console.log(employee.toString());
  employee.addSkill('clear code');
  console.log(employee.toString());

  let fd1 = new FrontendDeveloper(
    'Tom',
    grade.L1,
    Array('html', 'css', 'js'),
    'Sber',
    Array('HAML', 'Sass', 'bootstrap'),
    'frontend',
    3
  );
  console.log(fd1.toString());

  let bd1 = new BackendDeveloper(
    'Bob',
    grade.L2,
    Array('java', 'c++'),
    'Yandex',
    Array('spring', 'thymeleaf'),
    'backend',
    5
  );
  console.log(bd1.toString());

  let mng1 = new Manager(
    'Cris',
    grade.L4,
    Array('good speak', 'time managment'),
    'CFT',
    99
  );

  console.log(mng1.toString());
  console.log(mng1.checkMember(grade.L1, bd1));

  let project1 = new Project(
    'webApp',
    grade.L2,
    makeTeam(mng1, Array(fd1), Array(bd1))
  );
  console.log(project1.toString());
  project1.addNewProjectMember(fd1);

  let company1 = new Company(
    'Evil Corp',
    Array(project1),
    Array(project1),
    makeStaff(Array(mng1), Array(fd1), Array(bd1))
  );

  let project2 = new Project(
    'cryptoScum',
    grade.L1,
    makeTeam(mng1, Array(fd1), Array(bd1))
  );
  company1.addProject(project2);

  console.log(company1.toString());
  console.log(company1.getMembersQuantity());
}
