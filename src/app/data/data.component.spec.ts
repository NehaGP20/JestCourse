import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FakeService } from '../services/fake.service';

import { DataComponent } from './data.component';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;
  // Whatever methods we can add

  beforeEach(async () => {
    fakeServiceMock = {
      getDataV1: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ DataComponent ],
      providers: [
        { provide: FakeService, useValue: fakeServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getServiceData & set serviceData', () => {
    const expRes = {
      name: "Neha"
    };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    // ngOnInit will get triggered and so on
    fixture.detectChanges();
    expect(component.serviceData.name).toEqual(expRes.name);

  });

  it('should getServiceData & set errorMessage', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not found'
    });
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(throwError(errorResponse));
    component.getServiceData();
    expect(component.errorMessage).toBe('Not found');
  });

  // Branch test coverage code
  it('should set greetings as Good morning', () => {
    const expRes = {
      name: "Neha",
      time: 8
    };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good morning');
  });

  it('should set greetings as Good evening', () => {
    const expRes = {
      name: "Neha",
      time: 30
    };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good evening');
  });

  it('should set greetings as Good day', () => {
    const expRes = {
      name: "Neha",
      time: 15
    };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good day');
  });

});
