package com.opus.controller;

import com.opus.annotations.CheckAuthorization;
import com.opus.dto.ClientDTO;
import com.opus.enums.Entity;
import com.opus.enums.Permission;
import com.opus.service.ClientService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@Tag(name = "Clients", description = "Endpoint for clients api")
public class ClientController extends BaseController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @CheckAuthorization(entity = Entity.CLIENT, permission = Permission.READ)
    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        List<ClientDTO> clients = clientService.getAllClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @CheckAuthorization(entity = Entity.CLIENT, permission = Permission.READ)
    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable Long id) {
        ClientDTO client = clientService.getClientById(id);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CheckAuthorization(entity = Entity.CLIENT, permission = Permission.CREATE)
    @PostMapping
    public ResponseEntity<ClientDTO> createClient(@RequestBody ClientDTO ClientDto) {
        ClientDTO createdClient = clientService.createClient(ClientDto);
        return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
    }

    @CheckAuthorization(entity = Entity.CLIENT, permission = Permission.UPDATE)
    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> updateClient(@PathVariable Long id, @RequestBody ClientDTO ClientDto) {
        ClientDTO updatedClient = clientService.updateClient(id, ClientDto);
        if (updatedClient != null) {
            return new ResponseEntity<>(updatedClient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CheckAuthorization(entity = Entity.CLIENT, permission = Permission.DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.disableClient(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
