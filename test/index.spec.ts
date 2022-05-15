import 'mocha';
import {expect} from 'chai';
import {add} from '../src/index';

describe ('add', () => {
    it ('adds two numbers', () => {
        expect(add(1, 2)).to.equal(3);
    });

    it ('adds two negative numbers', () => {
        expect(add(-1, -2)).to.equal(-3);
    });
});