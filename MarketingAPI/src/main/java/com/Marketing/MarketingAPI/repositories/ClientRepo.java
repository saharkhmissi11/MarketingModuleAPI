package com.Marketing.MarketingAPI.repositories;

import com.Marketing.MarketingAPI.models.Client;
import com.Marketing.MarketingAPI.models.FieldOfActivity;
import com.Marketing.MarketingAPI.models.Gender;
import com.Marketing.MarketingAPI.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepo extends JpaRepository<Client,Long> {
    Optional<Client> findByGender(Gender gender);
    Optional<Client> findByOccupation(String occupation);
    Optional<Client> findByCountry(String country);
    Optional<Client> findByField(FieldOfActivity field);
}
