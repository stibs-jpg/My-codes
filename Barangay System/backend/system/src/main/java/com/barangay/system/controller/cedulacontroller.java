package com.barangay.system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
        return service.save(request);
    }

    @GetMapping
    public List<cedula> getAll() {
        return service.getAllCedula();
    }
}