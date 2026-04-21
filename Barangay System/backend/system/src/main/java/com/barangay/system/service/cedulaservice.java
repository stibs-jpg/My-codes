package com.barangay.system.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.barangay.system.model.cedula;
import com.barangay.system.repository.cedularepository;

@Service
public class cedulaservice {

    private final cedularepository repository;

    public cedulaservice(cedularepository repository) {
        this.repository = repository;
    }

    public cedula save(cedula request) {
    return repository.save(request);
}

    public List<cedula> getAllCedula() {
        return repository.findAll();
    }
}

