package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.ThemeDto;
import com.openclassrooms.mdd_api.mapper.ThemeMapper;
import com.openclassrooms.mdd_api.model.Theme;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.ThemeRepository;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThemeService {

    @Autowired
    private ThemeRepository themeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThemeMapper themeMapper;

    public List<ThemeDto> getAllThemes(String userEmail) {
        List<Theme> themes = themeRepository.findAll();

        // Récupérer l'utilisateur pour savoir à quels thèmes il est abonné
        User user = userRepository.findByEmail(userEmail).orElse(null);

        return themes.stream().map(theme -> {
            ThemeDto dto = themeMapper.toDto(theme);
            // Indiquer si l'utilisateur est abonné à ce thème
            dto.setIsSubscribed(user != null && user.getSubscriptions().contains(theme));
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void subscribe(String userEmail, Long themeId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new RuntimeException("Theme not found"));

        // Ajouter le thème aux abonnements de l'utilisateur
        user.getSubscriptions().add(theme);
        userRepository.save(user);
    }

    @Transactional
    public void unsubscribe(String userEmail, Long themeId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new RuntimeException("Theme not found"));

        // Retirer le thème des abonnements de l'utilisateur
        user.getSubscriptions().remove(theme);
        userRepository.save(user);
    }

    public List<ThemeDto> getUserSubscriptions(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getSubscriptions().stream()
                .map(theme -> {
                    ThemeDto dto = themeMapper.toDto(theme);
                    dto.setIsSubscribed(true);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}