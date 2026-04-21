package com.barangay.system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barangay.system.model.Complaint;
import com.barangay.system.service.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(ComplaintService service) {
        this.service = service;
    }

    @PostMapping
    public Complaint create(@RequestBody Complaint complaint) {
        return service.createComplaint(complaint);
    }

    @GetMapping
    public List<Complaint> getAll() {
        return service.getAllComplaints();
    }

    @GetMapping("/complaints")
    public Complaint getById(@PathVariable Long id) {
        return service.getComplaintById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteComplaint(id);
    }
}