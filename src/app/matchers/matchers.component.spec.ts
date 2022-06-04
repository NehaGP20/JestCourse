import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchersComponent } from './matchers.component';

describe('MatchersComponent', () => {
  let component: MatchersComponent;
  let fixture: ComponentFixture<MatchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test the exact equality => use toBe
  it('two plus two is four', () => {
    expect(2+2).toBe(4);
  });

  //  Test values
  it('Object values', () => {
    const data = {name: "neha"};
    expect(data).toEqual({name: "neha"});
  });

  // Truthiness
  it('null', () => {
    const val = null;
    expect(val).toBeNull();
    expect(val).toBeDefined();
    expect(val).not.toBeUndefined();
    expect(val).not.toBeTruthy();
    expect(val).toBeFalsy();
  });

  it('zero', () => {
    const val = 0;
    expect(val).not.toBeNull();
    expect(val).toBeDefined();
    expect(val).not.toBeUndefined();
    expect(val).not.toBeTruthy();
    expect(val).toBeFalsy();
  });

  // Numbers
  it('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equilent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  it('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    // expect(value).toBe(0.3); => This wont work because of rounding error
    expect(value).toBeCloseTo(0.3); 
  });

  // Strings
  it('there is no P in neha', () => {
    expect('neha').not.toMatch(/P/);
  });

  it('but there is world in techopsworld', () => {
    expect('techopsworld').toMatch(/world/);
  });

  // Arrays and iterable
  it('the shoppoing list has milk on it', () => {
    const shoppingList = [
      'banana',
      'apples',
      'dark chocolates',
      'milk',
      'paneer'
    ];
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
    // craeting a new set from arraylist
  });

  // Exceptions
  // it('compiling android goes as expected', () => {
   
  //   expect(function() { component.compileAndroidCode();}).toThrow();
  //   expect(function() { component.compileAndroidCode();}).toThrow(Error);

  //   // you can also use exact error msg or regEx
  //   expect(function() { component.compileAndroidCode();}).toThrow('you are using Old Android');
  //   expect(function() { component.compileAndroidCode();}).toThrow(/Android/);
  // });

  // This doesn't seem to work and it is throwing an error:-
  // property does not exist "compileAndroidCode"

  



});

