package com.Marketing.MarketingAPI.controllers;

import com.Marketing.MarketingAPI.DTO.CampaignDTO;
import com.Marketing.MarketingAPI.DTO.ClientDTO;
import com.Marketing.MarketingAPI.models.Client;
import com.Marketing.MarketingAPI.services.CampaignService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/campaign")
public class CampaignController {
    public final CampaignService campaignService;
    @GetMapping("/all")
    public ResponseEntity<List<CampaignDTO>> getAllCampaigns(){
        return new ResponseEntity<>(campaignService.getAllCampaigns(), HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<CampaignDTO> getCampaignById(@PathVariable("id") Long id){
        return new ResponseEntity<>(campaignService.getCampaignById(id),HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<CampaignDTO> addCampaignDraft(@RequestBody CampaignDTO campaignDTO ){
        return new ResponseEntity<>(campaignService.addCampaignDraft(campaignDTO),HttpStatus.CREATED);
    }
    @PostMapping("/{id}/addClients")
    public ResponseEntity<CampaignDTO> addClientsToCampaign(@PathVariable("id")Long id,@RequestBody List<ClientDTO> clients){
        return new ResponseEntity<>(campaignService.addClientsToCampaign(id,clients),HttpStatus.CREATED);
    }
    @PostMapping("/{id}/launch")
    public ResponseEntity<CampaignDTO> launchCampaign(@PathVariable("id")Long id) throws MessagingException {
        return new ResponseEntity<>(campaignService.lauchCampaign(id),HttpStatus.CREATED);
    }
}
