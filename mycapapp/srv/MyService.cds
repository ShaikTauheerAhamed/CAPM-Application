using { anubhav.db.master,anubhav.db.transaction } from '../db/datamodel';

service MyService @(path: 'MyService') {
 
    function greetings(name:String(20)) returns String;
    entity EmployeeSet as projection on master.employees;
}