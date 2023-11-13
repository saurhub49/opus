package com.opus.service;

import com.opus.converters.ClientDtoConverter;
import com.opus.dto.ClientDTO;
import com.opus.entity.Client;
import com.opus.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    private final ClientDtoConverter clientDtoConverterlientDtoConverter;

    public ClientService(ClientRepository clientRepository, ClientDtoConverter ClientDtoConverter) {
        this.clientRepository = clientRepository;
        this.clientDtoConverterlientDtoConverter = ClientDtoConverter;
    }

    public List<ClientDTO> getAllClients() {
        List<Client> clients = clientRepository.findAll();
        return clients.stream()
                .map(clientDtoConverterlientDtoConverter::mapToDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO getClientById(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        return client.map(value -> clientDtoConverterlientDtoConverter.mapToDTO(value)).orElse(null);
    }

    public ClientDTO createClient(ClientDTO ClientDto) {
        Client client = clientDtoConverterlientDtoConverter.mapToEntity(ClientDto);
        client.setCreateDate(new Date());
        client = clientRepository.save(client);
        return clientDtoConverterlientDtoConverter.mapToDTO(client);
    }

    public ClientDTO updateClient(Long id, ClientDTO ClientDto) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();

            client = clientDtoConverterlientDtoConverter.mapToEntity(ClientDto);

            client = clientRepository.save(client);
            return clientDtoConverterlientDtoConverter.mapToDTO(client);
        }

        throw new RuntimeException("Invalid Client!");
    }

    public void disableClient(Long id) {
        Optional<Client> optionalClient = clientRepository.findById(id);

        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            client.setStatus(false);
            clientRepository.save(client);
            return;
        }

        throw new RuntimeException("Invalid Client!");
    }
}
