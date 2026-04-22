package com.barangay.system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.barangay.system.model.BusinessPermit;
import com.barangay.system.repository.BusinessPermitRepository;

@Service
public class BusinessPermitService {

    private final BusinessPermitRepository repository;

    public BusinessPermitService(BusinessPermitRepository repository) {
        this.repository = repository;
    }

    public BusinessPermit save(BusinessPermit permit) {
        return repository.save(permit);
    }

    public List<BusinessPermit> getAll() {
        return repository.findAll();
    }
    public List<BusinessPermit> getByUserId(Long userId) {
    return repository.findByUserId(userId);
}

    public BusinessPermit getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permit not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}