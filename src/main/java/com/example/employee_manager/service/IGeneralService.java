package com.example.employee_manager.service;

import java.util.Optional;

public interface IGeneralService<T> {
    Iterable<T> findAll();
    void delete(Long id);
    T update(T t);
    Optional<T> findById(Long id);
}

