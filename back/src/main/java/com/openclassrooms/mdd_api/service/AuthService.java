package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.AuthResponse;
import com.openclassrooms.mdd_api.dto.LoginRequest;
import com.openclassrooms.mdd_api.dto.RegisterRequest;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.UserRepository;
import com.openclassrooms.mdd_api.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponse register(RegisterRequest registerRequest) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Vérifier si le username existe déjà
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        // Créer le nouvel utilisateur
        User user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        userRepository.save(user);

        // Authentifier automatiquement après l'inscription
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getEmail(),
                        registerRequest.getPassword()
                )
        );

        String jwt = jwtUtils.generateToken(authentication);

        // Récupérer l'utilisateur depuis la base de données
        User savedUser = userRepository.findByEmail(registerRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(
                jwt,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail()
        );
    }

    public AuthResponse login(LoginRequest loginRequest) {
        // Authentification
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getIdentifier(),
                        loginRequest.getPassword()
                )
        );

        String jwt = jwtUtils.generateToken(authentication);

        // Récupérer l'utilisateur depuis la base de données
        User user = userRepository.findByEmailOrUsername(loginRequest.getIdentifier(), loginRequest.getIdentifier())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(
                jwt,
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }
}