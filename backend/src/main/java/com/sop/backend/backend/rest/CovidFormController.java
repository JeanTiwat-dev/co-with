package com.sop.backend.backend.rest;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
public class CovidFormController {
    @RequestMapping(value = "/addForm", method = RequestMethod.POST)
    public String addForm(@RequestParam("file")MultipartFile file) throws IOException {
//        System.out.println(file.getOriginalFilename());
//        System.out.println(file.getName());
//        System.out.println(file.getContentType());
//        System.out.println(file.getSize());
        String Path_Directory = new ClassPathResource("static/image").getFile().getAbsolutePath();
//        String Path_Directory = "/Users/tathus/Downloads/backend/src/main/resources/static/image";
        System.out.println(Path_Directory);
        Files.copy(file.getInputStream(), Paths.get(Path_Directory+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        return "Success";
    }
}
