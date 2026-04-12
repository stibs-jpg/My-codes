package com.barangay.system.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.time.LocalDateTime;

import com.barangay.system.model.DocumentRequest;
import com.barangay.system.repository.DocumentRequestRepository;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    @Autowired
    private DocumentRequestRepository repo;

    // TEST ENDPOINT (very important)
    @GetMapping("/test")
    public String test() {
        return "Controller is working";
    }

    @PostMapping("/submit")
    public DocumentRequest submit(@RequestBody DocumentRequest request) {
        request.setStatus("PENDING");
        request.setSubmittedAt(LocalDateTime.now());
        return repo.save(request);
    }

    @GetMapping("/all")
    public List<DocumentRequest> getAll() {
        return repo.findAll();
    }
}