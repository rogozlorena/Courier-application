package com.utcn.scdproiect.Courier;

import com.utcn.scdproiect.Pkg.Package;
import com.utcn.scdproiect.Courier.Courier;
import com.utcn.scdproiect.Pkg.PackageRepository;
import com.utcn.scdproiect.Pkg.PackageStatus;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourierService {
    @Autowired
    private CourierRepository courierRepository;
    @Autowired
    private PackageRepository packageRepository;

    public List<Package> getPackagesForCourier(int courierId) {
        // Returnează lista de pachete asociată curierului din baza de date
        return packageRepository.findByCourierId(courierId);
    }

    @Transactional
    public Courier createCourier(Courier courier) {
        return courierRepository.save(courier);
    }

    public List<Courier> getAllCouriers() {
        List<Courier> c = (List<Courier>) courierRepository.findAll();
        System.out.println(c);
        return c;
    }

    public Courier getCourierById(Integer id) {
        Optional<Courier> courier = courierRepository.findById(id);
        return courier.orElse(null);
    }

    public Courier updateCourier(Integer id, Courier updatedCourierRequest) {
        Optional<Courier> existingCourierOptional = courierRepository.findById(id);
        if (existingCourierOptional.isPresent()) {
            Courier existingCourier = existingCourierOptional.get();
            existingCourier.setId(updatedCourierRequest.getId());
            existingCourier.setName(updatedCourierRequest.getName());
            existingCourier.setMail(updatedCourierRequest.getMail());
            existingCourier.setManagerId(updatedCourierRequest.getManagerId());
            return courierRepository.save(existingCourier);
        }
        return null;
    }

    public boolean deleteCourier(Integer id) {
        Optional<Courier> existingCourier = courierRepository.findById(id);
        if (existingCourier.isPresent()) {
            courierRepository.delete(existingCourier.get());
            return true;
        }
        return false;
    }


    public List<Courier> getAllCouriersWithoutPendingPackages() {
        List<Courier> allCouriers = (List<Courier>) courierRepository.findAll();
        return allCouriers.stream()
                .filter(courier -> {
                    // Obține pachetele curierului
                    List<Package> packages = packageRepository.findByCourierId(courier.getId());
                    // Verifică dacă nu există niciun pachet cu statusul "PENDING"
                    return packages.stream().noneMatch(pkg -> pkg.getStatus() == PackageStatus.PENDING);
                })
                .collect(Collectors.toList());
    }



    public Map<Integer, Long> getAllManagersAndDeliveredNumber() {
        List<Courier> couriers = (List<Courier>) courierRepository.findAll();

        return couriers.stream()
                .collect(Collectors.groupingBy(
                        Courier::getManagerId,
                        Collectors.summingLong(courier ->
                                packageRepository.findByCourierId(courier.getId()).stream()
                                        .filter(pkg -> PackageStatus.DELIVERED.equals(pkg.getStatus()))
                                        // Comparăm folosind enum-ul
                                        .count()
                        )
                ));
    }



}