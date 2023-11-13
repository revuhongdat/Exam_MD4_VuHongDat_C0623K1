package com.example.employee_manager.controller;

import com.example.employee_manager.model.Employee;
import com.example.employee_manager.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    IEmployeeService employeeService;
    @GetMapping
    ResponseEntity<Iterable<Employee>> findAll() {
        List<Employee> employees = (List<Employee>) employeeService.findAll();
        if (employees.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    ResponseEntity<Optional<Employee>> findById(@PathVariable Long id) {
        Optional<Employee> optionalEmployee = employeeService.findById(id);
        if (!optionalEmployee.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(optionalEmployee, HttpStatus.OK);
    }
    @GetMapping("/DBD/{id}")
    ResponseEntity<Iterable<Employee>> findByDepartmentId(@PathVariable Long id) {
        List<Employee> employees = (List<Employee>) employeeService.findAllByDepartmentId(id);
        if (employees.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    @PostMapping
    ResponseEntity<Employee> create(@RequestBody Employee employee) {
        employeeService.update(employee);
        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }
    @PutMapping
    ResponseEntity<Employee> edit(@RequestBody Employee employee) {
        employeeService.update(employee);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
