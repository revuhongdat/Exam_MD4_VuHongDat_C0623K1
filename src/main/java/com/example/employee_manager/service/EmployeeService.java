package com.example.employee_manager.service;

import com.example.employee_manager.model.Employee;
import com.example.employee_manager.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class EmployeeService implements IEmployeeService{
    @Autowired
    IEmployeeRepository iEmployeeRepository;
    @Override
    public Iterable<Employee> findAll() {
        return iEmployeeRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        iEmployeeRepository.deleteById(id);
    }

    @Override
    public Employee update(Employee employee) {
        return iEmployeeRepository.save(employee);
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return iEmployeeRepository.findById(id);
    }

    @Override
    public Iterable<Employee> findAllByDepartmentId(Long id) {
        return iEmployeeRepository.findAllByDepartmentId(id);
    }
}
