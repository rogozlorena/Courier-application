package com.utcn.scdproiect.Courier;

import com.utcn.scdproiect.Pkg.Package;
import com.utcn.scdproiect.Pkg.PackageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

//@RestController
@CrossOrigin
//@Controller
@RestController
@AllArgsConstructor
public class CourierController {
    @Autowired
    private final CourierService courierService;
    @Autowired
    private final PackageService packageService;
    /*@GetMapping("/courier/{id}/packages")
    public List<Package> getPackagesForCourier(@PathVariable("id") int id) {
        return List.of();
    }
     */
    @GetMapping("/courier/{id}/packages")
    public ResponseEntity<List<Package>> getPackagesForCourier(
            @PathVariable("id") Integer id// valoarea parametrului "id" va fi obtinuta din calea URL
    ){
        Courier courier = courierService.getCourierById(id);

        List<Package> packages = packageService.findAllPackagesByCourierID(id);
        if(packages == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(packages);
    }
    @PostMapping("/create-courier")
    public ResponseEntity<Courier> createCourier(@RequestBody Courier courier) {
        Courier createdCourier = courierService.createCourier(courier);
        return ResponseEntity.ok(createdCourier);
    }
    @GetMapping("/get-courier")
    public ResponseEntity<List<Courier>> getAllCouriers() {
        List<Courier> couriers = courierService.getAllCouriers();
        return ResponseEntity.ok(couriers);
    }
    @GetMapping("/get-courier/{id}")
    public ResponseEntity<Courier> getCourierById(@PathVariable Integer id) {
        Courier courier = courierService.getCourierById(id);
        if (courier != null) {
            return ResponseEntity.ok(courier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/update-courier/{id}")
    public ResponseEntity<Courier> updateCourier(@PathVariable Integer id, @RequestBody Courier updatedCourierRequest) {
        Courier updatedCourier = courierService.updateCourier(id, updatedCourierRequest);
        if (updatedCourier != null) {
            return ResponseEntity.ok(updatedCourier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete-courier/{id}")
    public ResponseEntity<Void> deleteCourier(@PathVariable Integer id) {
        boolean isDeleted = courierService.deleteCourier(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/couriers/no-pending-packages")
    public ResponseEntity<List<Courier>> getAllCouriersWithoutPendingPackages() {
        List<Courier> couriers = courierService.getAllCouriersWithoutPendingPackages();
        return ResponseEntity.ok(couriers);
    }

    @GetMapping("/managers/delivered-packages-count")
    public ResponseEntity<Map<Integer, Long>> getAllManagersAndDeliveredNumber() {
        Map<Integer, Long> managersWithDeliveredCount = courierService.getAllManagersAndDeliveredNumber();
        return ResponseEntity.ok(managersWithDeliveredCount);
    }

}

