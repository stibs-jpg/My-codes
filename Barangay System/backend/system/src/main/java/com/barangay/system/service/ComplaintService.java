package com.barangay.system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.barangay.system.model.Complaint;
import com.barangay.system.repository.ComplaintRepository;

@Service
public class ComplaintService {

    private final ComplaintRepository repository;

    public ComplaintService(ComplaintRepository repository) {
        this.repository = repository;
    }

    public Complaint createComplaint(Complaint complaint) {
        return repository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return repository.findAll();
    }

    public Complaint getComplaintById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    public void deleteComplaint(Long id) {
        repository.deleteById(id);
    }
}