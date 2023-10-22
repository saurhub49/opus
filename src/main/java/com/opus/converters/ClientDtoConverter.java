package com.opus.converters;

import com.opus.dto.ClientDTO;
import com.opus.entity.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientDtoConverter {

    public ClientDTO mapToDTO(Client client) {
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setId(client.getId());
        clientDTO.setName(client.getName());
        clientDTO.setCreateDate(client.getCreateDate());
        clientDTO.setStatus(client.getStatus());
        clientDTO.setWebsite(client.getWebsite());
        clientDTO.setPictureUrl(client.getPictureUrl());
        return clientDTO;
    }

    public Client mapToEntity(ClientDTO clientDTO) {
        Client client = new Client();
        client.setName(clientDTO.getName());
        client.setCreateDate(clientDTO.getCreateDate());
        client.setStatus(clientDTO.getStatus());
        client.setWebsite(clientDTO.getWebsite());
        client.setPictureUrl(clientDTO.getPictureUrl());
        return client;
    }
}
