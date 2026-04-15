package com.barangay.system.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barangay.system.model.BarangayID;
import com.barangay.system.repository.BarangayIDRepository;
@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class BarangayIDController {

    @Autowired
    private BarangayIDRepository repo;

    // TEST ENDPOINT (very important)
    @GetMapping("/test")
    public String test() {
        return "Controller is working";
    }

    @PostMapping("/submit")
    public BarangayID submit(@RequestBody BarangayID request) {
        request.setStatus("PENDING");
        request.setSubmittedAt(LocalDateTime.now());
        return repo.save(request);
    }

    @GetMapping("/all")
    public List<BarangayID> getAll() {
        return repo.findAll();
    }
}