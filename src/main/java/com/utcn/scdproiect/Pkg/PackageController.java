package com.utcn.scdproiect.Pkg;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
@AllArgsConstructor

public class PackageController {
    @Autowired
    private final PackageService packageService;

    @PostMapping("/create-package")
    public ResponseEntity<Package> createPackage(@RequestBody Package pkg) {
        Package createdPackage = packageService.createPackage(pkg);
        return ResponseEntity.ok(createdPackage);
    }
    @GetMapping("/get-package")
    public ResponseEntity<List<Package>> getAllPackages() {
        List<Package> packages = packageService.getAllPackages();
        return ResponseEntity.ok(packages);
    }

    @GetMapping("/get-package/{id}")
    public ResponseEntity<Package> getPackageById(@PathVariable Integer id) {
        Package pkg = packageService.getPackageById(id);
        if (pkg != null) {
            return ResponseEntity.ok(pkg);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/update-package/{id}")
    public ResponseEntity<Package> updatePackage(@PathVariable Integer id, @RequestBody Package updatedPkg) {
        Package updatedPackage = packageService.updatePackage(id, updatedPkg);
        if (updatedPackage != null) {
            return ResponseEntity.ok(updatedPackage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete-package/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Integer id) {
        boolean isDeleted = packageService.deletePackage(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
