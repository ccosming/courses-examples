// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract DigitalIdentity {
    struct Person {
        uint id;
        string name;
        string lastname;
        uint age;
    }

    uint personsCount;
    mapping (uint => Person) public persons;

    constructor()  {
        personsCount = 0;
    }

    function addPerson(string memory _name, string memory _lastname, uint _age) public {
        require(bytes(_name).length > 0, "First name cannot be left empty");
        require(bytes(_lastname).length > 0, "Lastname cannot be left empty");
        require(_age > 18, "Age must be upper 18");

        persons[personsCount] = Person(personsCount, _name, _lastname, _age);
        personsCount++;
    }

    function getPerson(uint _id) public view returns(Person memory) {
        return persons[_id];
    }

    function getPersonsCount() public view returns(uint) {
        return personsCount;
    }
}