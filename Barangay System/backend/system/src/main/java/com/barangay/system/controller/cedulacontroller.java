package com.barangay.system.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barangay.system.model.cedula;
import com.barangay.system.service.cedulaservice;

@RestController
@RequestMapping("/api/cedulas")
@CrossOrigin(origins = "*")
public class cedulacontroller {

    private final cedulaservice service;

    public cedulacontroller(cedulaservice service) {
        this.service = service;
    }

    @PostMapping
    public cedula create(@RequestBody cedula request) {
    request.setStatus("PENDING");               // ← add this
    request.setSubmittedAt(LocalDateTime.now()); // ← add this
    return service.save(request);
}
    @GetMapping
    public List<cedula> getAll() {
    return service.getAll();
    }
    @GetMapping("/user/{userId}")
    public List<cedula> getByUserId(@PathVariable Long userId) {
    return service.getByUserId(userId);
    }   
    @GetMapping("/{id}")
    public cedula getById(@PathVariable Long id) {
        return service.getById(id); 
    }
    @PutMapping("/approve/{id}")
public cedula approve(@PathVariable Long id) {
    cedula req = service.getById(id);
    req.setStatus("APPROVED");
    return service.save(req);
}

@PutMapping("/reject/{id}")
public cedula reject(@PathVariable Long id) {
    cedula req = service.getById(id);
    req.setStatus("REJECTED");
    return service.save(req);
}
;
}
