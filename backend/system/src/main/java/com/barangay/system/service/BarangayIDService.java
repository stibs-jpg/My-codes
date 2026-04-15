package com.barangay.system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.barangay.system.model.BarangayID;
import com.barangay.system.repository.BarangayIDRepository;

@Service
public class BarangayIDService {

    private final BarangayIDRepository barangayIDRepository;

    public BarangayIDService(BarangayIDRepository barangayIDRepository) {
        this.barangayIDRepository = barangayIDRepository;
    }

    public BarangayID saveBarangayID(BarangayID barangayID) {
        return barangayIDRepository.save(barangayID);
    }

    public List<BarangayID> getAllBarangayIDs() {
        return barangayIDRepository.findAll();
    }
}