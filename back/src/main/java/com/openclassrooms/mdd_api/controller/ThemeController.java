package com.openclassrooms.mdd_api.controller;

import com.openclassrooms.mdd_api.dto.ThemeDto;
import com.openclassrooms.mdd_api.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/themes")
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    @GetMapping
    public ResponseEntity<List<ThemeDto>> getAllThemes(Authentication authentication) {
        String email = authentication.getName();
        List<ThemeDto> themes = themeService.getAllThemes(email);
        return ResponseEntity.ok(themes);
    }

    @PostMapping("/{themeId}/subscribe")
    public ResponseEntity<Void> subscribe(
            @PathVariable Long themeId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        themeService.subscribe(email, themeId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{themeId}/unsubscribe")
    public ResponseEntity<Void> unsubscribe(
            @PathVariable Long themeId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        themeService.unsubscribe(email, themeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subscriptions")
    public ResponseEntity<List<ThemeDto>> getUserSubscriptions(Authentication authentication) {
        String email = authentication.getName();
        List<ThemeDto> subscriptions = themeService.getUserSubscriptions(email);
        return ResponseEntity.ok(subscriptions);
    }
}