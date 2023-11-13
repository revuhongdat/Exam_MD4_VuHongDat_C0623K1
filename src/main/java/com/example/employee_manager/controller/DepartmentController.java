package com.example.employee_manager.controller;

import com.example.employee_manager.model.Department;
import com.example.employee_manager.service.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/departments")
public class DepartmentController {
    @Autowired
    IDepartmentService departmentService;
    @GetMapping
    ResponseEntity<Iterable<Department>> findAll() {
        List<Department> departments = (List<Department>) departmentService.findAll();
        if (departments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }
}
