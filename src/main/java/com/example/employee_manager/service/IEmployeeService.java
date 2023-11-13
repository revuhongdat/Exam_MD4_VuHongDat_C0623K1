package com.example.employee_manager.service;

import com.example.employee_manager.model.Employee;

public interface IEmployeeService extends IGeneralService<Employee>{
    Iterable<Employee> findAllByDepartmentId(Long id);
}
