package com.utcn.scdproiect.Pkg;

import com.utcn.scdproiect.Courier.Courier;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PackageService {
    @Autowired
    private  PackageRepository packageRepository;
    @Transactional
    public Package createPackage(Package pack) {
        return packageRepository.save(pack);
    }
    public List<Package> getAllPackages() {
        List<Package> p = packageRepository.findAll();
        System.out.println(p);
        return p;
    }

    public Package getPackageById(Integer id) {
        Optional<Package> pkg = packageRepository.findById(id);
        return pkg.orElse(null);
    }

    public Package updatePackage(Integer id, Package updatedPkg) {
        Optional<Package> existingPackageOptional = packageRepository.findById(id);
        if (existingPackageOptional.isPresent()) {
            Package existingPackage = existingPackageOptional.get();
            existingPackage.setCourier(updatedPkg.getCourier());
            existingPackage.setDeliveryAddress(updatedPkg.getDeliveryAddress());
            existingPackage.setPayOnDelivery(updatedPkg.isPayOnDelivery());
            existingPackage.setStatus(updatedPkg.getStatus());
            return packageRepository.save(existingPackage);
        }
        return null;
    }

    public boolean deletePackage(Integer id) {
        Optional<Package> existingPackage = packageRepository.findById(id);
        if (existingPackage.isPresent()) {
            packageRepository.delete(existingPackage.get());
            return true;
        }
        return false;
    }

    public List<Package> findAllPackagesByCourierID(Integer courierId) {

        return packageRepository.findByCourierId(courierId);

    }

}
