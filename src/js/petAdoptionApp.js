const App = {
    web3: null,
    contracts: {},
    AdoptionContractAddress: "0xD66Ff6726BF6cc40204715eC7Af3189406150354",
    currentAccount: null,
    AdoptionContractABI:[
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint8",
                    "name": "_decimals",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "_initial_Supply",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ERC1155InsufficientBalance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC1155InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "idsLength",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "valuesLength",
                    "type": "uint256"
                }
            ],
            "name": "ERC1155InvalidArrayLength",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "ERC1155InvalidOperator",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC1155InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC1155InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ERC1155MissingApprovalForAll",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                }
            ],
            "name": "TransferBatch",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "TransferSingle",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "value",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "URI",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "Adoption_Application",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "Adoption_Contract",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "Change_Ownership_Form",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "Microchip_Number",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "Pet_Adoption_Fee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "Signed_Adoption_Contract",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "applicationTokenRecipients",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "approvedAdopters",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "balanceOfAddr",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "accounts",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                }
            ],
            "name": "balanceOfBatch",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "listingId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "getMCNbyListingID",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "listingId",
                    "type": "uint256"
                }
            ],
            "name": "getPetListing",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "pet_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "adoptionFee",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "ownerAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getTokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_MicroChip_Number",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "pet_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "adoptionFee",
                    "type": "uint256"
                }
            ],
            "name": "listPet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "internalType": "string",
                    "name": "pdfURL",
                    "type": "string"
                }
            ],
            "name": "mintAndSendPetApplicationToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextListingId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "petListings",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "petName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "pet_description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "adoptionFee",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "ownerAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "listingId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "pdfURL",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "requestAdoptionFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeBatchTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "listingId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "pdfURL",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "sendAdoptionContractToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "pdfURL",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "sendSignedAdoptionContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "signedAdoptionContracts",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferPetAdoptionFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "uri",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],

    init: async function () {
        await this.initWeb3();
        await this.initContract();
        this.bindEvents();
        this.listenForAccountChanges();
        this.populateAddress();
    },

    initWeb3: async function () {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.currentAccount = (await this.web3.eth.getAccounts())[0];
                // Check if connected to Sepolia Testnet
                const networkId = await this.web3.eth.net.getId();
                if(networkId !== 11155111) { // Network ID for Sepolia
                    console.error("Please connect to the Sepolia Testnet");
                    return;
                }
            } catch (error) {
                console.error("User denied account access:", error);
            }
        } else {
            console.log('Use metamask, not an ethereum');
        }
    },


    initContract: async function () {
        this.contracts.AdoptionContract = new this.web3.eth.Contract(
            this.AdoptionContractABI,
            this.AdoptionContractAddress,
        );
    },

    bindEvents: function () {
        $(document).on("click", "#viewPetsButton", this.handleViewPets);
        $(document).on("click", "#listPetButton", this.handleListPet);
        $(document).on("click", "#transferMicrochipButton", App.handleTransferMicrochipToken);
        $(document).on("click", "#sendApplicationButton", App.handleSendApplication);
        $(document).on("click", "#sendContractButton", App.handleSendAdoptionContract);
        $(document).on("click", "#sendAdoptionFeeButton", App.handleRequestAdoptionFee);
        $(document).on("click", "#CheckBalanceButton", App.handleCheckBalance);
        $(document).on("click", "#sendSignedContractButton", App.handleSendSignedContract);
    },

    handleViewPets: async () => {
        try {
            const nextListingId = await App.contracts.AdoptionContract.methods.nextListingId().call();
            let petHtml = '';
            for (let i = 1; i < nextListingId; i++) {
                const pet = await App.contracts.AdoptionContract.methods.getPetListing(i).call();
                //do not display deleted pet
                if(pet.ownerAddress === '0x0000000000000000000000000000000000000000') {
                    continue;
                }
                // Log all pet details to the console to check if successfully recorded by the struct in sc
                console.log(`Pet ID: ${i}, Name: ${pet.pet_name}, Description: ${pet.description}, Adoption Fee: ${pet.adoptionFee}, Owner Address: ${pet.ownerAddress}`);

                petHtml += `
                    <div class="pet">
                        <img src="/images/default_dog.png" alt="Pet">
                        <div class="pet-info">
                            <h3>${pet.pet_name || 'No Name'}</h3>
                            <p>${pet.description || 'No Description'}</p>
                            <div class="pet-details">
                                <span class="listing-id">ID: ${i}</span> |
                                <span class="adoption-fee">Fee: $${pet.adoptionFee}</span> |
                                <span class="owner-address">Owner: ${pet.ownerAddress || 'No Owner Addr recoreded'}</span>
                            </div>
                        </div>
                        <button class="adopt-now" onclick="App.openAdoptApplicationModal(${i})">Adopt Now</button>
                    </div>
            `;
            }
            document.querySelector('.pet-list').innerHTML = petHtml;
        } catch (error) {
            console.error('Error fetching pet listings:', error);
        }
    },

    handleListPet: function () {
        const newPetForm = document.getElementById('newPetForm');
        const microchipNumber = newPetForm.querySelector('#microchipNumber').value;
        const petName = newPetForm.querySelector('#petName').value;
        const description = newPetForm.querySelector('#description').value;
        const adoptionFee = newPetForm.querySelector('#adoptionFee').value;

        App.contracts.AdoptionContract.methods.listPet(microchipNumber, petName, description, adoptionFee)
            .send({ from: App.currentAccount })
            .then((result) => {
                console.log('Pet listed successfully', result);
            })
            .catch((error) => {
                console.error('Error listing new pet:', error);
            });
    },

    handleTransferMicrochipToken: function() {
        const transferForm = document.getElementById('transferMicrochipForm');
        const listingId = transferForm.querySelector('#transferListingId').value;
        const receiverAddress = transferForm.querySelector('#receiverAddress').value;

        App.contracts.AdoptionContract.methods.getMCNbyListingID(listingId, receiverAddress)
            .send({ from: App.currentAccount })
            .then((result) => {
                console.log('Microchip token transferred successfully', result);
            })
            .catch((error) => {
                console.error('Error transferring microchip token:', error);
            });
    },

    handleSendApplication: function() {
        const applicationForm = document.getElementById('applicationForm');
        const applicationLink = applicationForm.querySelector('#applicationLink').value;
        const recipientAddress = applicationForm.querySelector('#recipientAddress').value;
        let data = ""; //leabe empty for now

        App.contracts.AdoptionContract.methods.mintAndSendPetApplicationToken(
            recipientAddress,
            App.web3.utils.toHex(data),
            applicationLink
        )
            .send({ from: App.currentAccount })
            .then((result) => {
                console.log('Application token sent successfully', result);
            })
            .catch((error) => {
                console.error('Error sending application token:', error);
            });
    },

    handleSendAdoptionContract: function() {
        const contractForm = document.getElementById('contractForm');
        const listingId = contractForm.querySelector('#contractListingId').value;
        const recipientAddress = contractForm.querySelector('#contractRecipientAddress').value;
        const pdfURL = contractForm.querySelector('#contractPdfURL').value;
        let data = ""; // Add any data if needed

        App.contracts.AdoptionContract.methods.sendAdoptionContractToken(
            listingId,
            recipientAddress,
            pdfURL,
            App.web3.utils.toHex(data)
        )
            .send({ from: App.currentAccount })
            .then((result) => {
                console.log('Adoption contract token sent successfully', result);
            })
            .catch((error) => {
                console.error('Error sending adoption contract token:', error);
            });
    },

    handleSendSignedContract: function() {
        const signedContractForm = document.getElementById('signedContractForm');
        const recipientAddress = signedContractForm.querySelector('#signedContractRecipientAddress').value;
        const pdfURL = signedContractForm.querySelector('#signedContractPdfURL').value;
        let data = "";
        App.contracts.AdoptionContract.methods.sendSignedAdoptionContract(
            recipientAddress,
            pdfURL,
            App.web3.utils.toHex(data)
        )
            .send({ from: App.currentAccount })
            .then((result) => {
                console.log('Signed adoption contract sent successfully', result);
                // Further UI updates or notifications can be added here
            })
            .catch((error) => {
                console.error('Error sending signed adoption contract:', error);
            });
    },


    handleRequestAdoptionFee: function() {
        const feeForm = document.getElementById('adoptionFeeForm');
        const listingId = feeForm.querySelector('#feeListingId').value;
        const adopterAddress = feeForm.querySelector('#adopterFeeAddress').value;
        const pdfURL = feeForm.querySelector('#ownershipFormPdfURL').value;
        let data = "";
        App.contracts.AdoptionContract.methods.requestAdoptionFee(
            adopterAddress,
            listingId,
            pdfURL,
            App.web3.utils.toHex(data)
        )
            .send({ from: App.currentAccount })
            .then((result) => {
                console.log('Adoption fee requested successfully', result);
                // Additional UI updates or notifications can be added here
            })
            .catch((error) => {
                console.error('Error in requesting adoption fee:', error);
            });
    },

    handleCheckBalance :function() {
        const balanceForm = document.getElementById('balanceForm'); // Assuming you have a form for this
        const userAddress = balanceForm.querySelector('#userAddress').value;
        const tokenId = balanceForm.querySelector('#tokenId').value; // Replace with the actual token ID field if different
        const balanceDisplay = document.getElementById('displayBalance');

        App.contracts.AdoptionContract.methods.balanceOfAddr(userAddress, tokenId)
            .call()
            .then((balance) => {
                console.log(`Balance of token ID ${tokenId} for user ${userAddress}: ${balance}`);
                balanceDisplay.textContent = balance; // Update the UI with the balance
            })
            .catch((error) => {
                console.error('Error fetching balance:', error);
                balanceDisplay.textContent = 'Error fetching balance'; // Display error in UI
            });
    },


    listenForAccountChanges: function () {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                this.currentAccount = accounts[0];
                console.log('Account changed:', this.currentAccount);
            }
        });
    },

    populateAddress: async function () {
        const userAccounts = await this.web3.eth.getAccounts();
        this.currentAccount = userAccounts[0];

        const addressElement = document.getElementById("currentUserAddress");
        if (addressElement) {
            addressElement.innerText = "Current User Address: " + this.currentAccount;
        } else {
            console.error("Cannot find 'currentUserAddress'.");
        }
    },
};
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

window.ethereum.on('accountsChanged', function (){
    location.reload();
})