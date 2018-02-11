class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters} meters`);
    }
}

// class Dog with name

// Should we be able to instantiate an animal directly?
let animal = new Animal();
animal.move(100);
