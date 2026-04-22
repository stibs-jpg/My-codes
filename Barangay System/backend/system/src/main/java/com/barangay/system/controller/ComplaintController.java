package com.barangay.system.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barangay.system.model.Complaint;
import com.barangay.system.service.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(ComplaintService service) {
        this.service = service;
    }
    @PostMapping
    public Complaint create(@RequestBody Complaint complaint) {
    complaint.setStatus("PENDING");         // ← add this
    complaint.setSubmittedAt(LocalDateTime.now()); // ← add this
    return service.createComplaint(complaint);
}

    @GetMapping
    public List<Complaint> getAll() {
        return service.getAllComplaints();
    }

    @GetMapping("/user/{userId}")
    public List<Complaint> getByUserId(@PathVariable Long userId) {
    return service.getByUserId(userId);
}

    @GetMapping("/{id}")
    public Complaint getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteComplaint(id);
    }

    @PutMapping("/approve/{id}")
public Complaint approve(@PathVariable Long id) {
    Complaint req = service.getById(id);
    req.setStatus("APPROVED");
    return service.createComplaint(req);
}

@PutMapping("/reject/{id}")
public Complaint reject(@PathVariable Long id) {
    Complaint req = service.getById(id);
    req.setStatus("REJECTED");
    return service.createComplaint(req);
}
}