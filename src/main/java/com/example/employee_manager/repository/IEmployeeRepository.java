package com.example.employee_manager.repository;

import com.example.employee_manager.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IEmployeeRepository extends JpaRepository<Employee, Long> {
    Iterable<Employee> findAllByDepartmentId(Long id);
}
