package com.barangay.system.Util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        System.out.println("ADMIN: " + encoder.encode("admin"));
        System.out.println("CAPTAIN: " + encoder.encode("captain"));
        System.out.println("SECRETARY: " + encoder.encode("staff"));
    }
}