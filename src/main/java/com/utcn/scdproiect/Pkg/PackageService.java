package com.utcn.scdproiect.Pkg;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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
}
