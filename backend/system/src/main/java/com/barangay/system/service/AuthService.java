package com.barangay.system.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.barangay.system.DTO.LoginRequest;
import com.barangay.system.DTO.LoginResponse;
import com.barangay.system.DTO.SignupRequest;
import com.barangay.system.DTO.SignupResponse;  
import com.barangay.system.model.Login;
import com.barangay.system.model.Role;
import com.barangay.system.repository.LoginRepository;

@Service
public class AuthService {

    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(LoginRepository loginRepository,
                       PasswordEncoder passwordEncoder) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        // 1. FIND USER (ONLY ONCE)
        Login user = loginRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. CHECK PASSWORD
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // 3. BUILD RESPONSE
        LoginResponse response = new LoginResponse();
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setMessage("Login successful");

        return response;
    }

    public SignupResponse signup(SignupRequest request) {

    // 1. CHECK IF EMAIL EXISTS
    if (loginRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new RuntimeException("Email already exists");
    }

    // 2. CREATE USER
    Login user = new Login();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    // ALWAYS RESIDENT ON SIGNUP
    user.setRole(Role.RESIDENT);

    Login savedUser = loginRepository.save(user);

    // 3. RESPONSE
    SignupResponse response = new SignupResponse();
    response.setUserId(savedUser.getId());
    response.setEmail(savedUser.getEmail());
    response.setMessage("Signup successful");

    return response;
}
}