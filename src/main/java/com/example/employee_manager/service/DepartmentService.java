package com.example.employee_manager.service;

import com.example.employee_manager.model.Department;
import com.example.employee_manager.repository.IDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class DepartmentService implements IDepartmentService{
    @Autowired
    IDepartmentRepository iDepartmentRepository;
    @Override
    public Iterable<Department> findAll() {
        return iDepartmentRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        iDepartmentRepository.deleteById(id);
    }

    @Override
    public Department update(Department department) {
        return iDepartmentRepository.save(department);
    }

    @Override
    public Optional<Department> findById(Long id) {
        return iDepartmentRepository.findById(id);
    }
}
