import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { FakeService } from './fake.service';

describe('FakeService', () => {
  let service: FakeService;
  let httpClientSpy: any;
  // Since we are passing mock http obj. We need to inform that it has get and post method

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    }
   service = new FakeService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // There are two ways to test get method
  // 1. Using constructor approach
  // 2. Using TestBed approach

  // GET call testing
  it('should test getDataV1', () => {
    const res = "Hope";
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getDataV1();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toBeCalledWith(url);
  });

  it('should test getDataV2', (done) => {
    const res = "Hope2";
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    // here we can test if the mock res is same as the get call res
    service.getDataV2().subscribe(
      {
        next: data => {
          expect(data).toEqual(res);
          done(); 
          // make this as async rest call
        },
        error: error => console.log(error)
      }

    );
    
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toBeCalledWith(url);
  });

  it('should test getDataV2 => error scenerio', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not found'
    })
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(errorResponse));
    // here we can test if the mock res is same as the get call res
    service.getDataV2().subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.message).toContain('test 404 error');
          done();
        }
      }
    );
    
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toBeCalledWith(url);
  });

  // POST call testing
  it('should post data v1', () => {
    const command = 'testing';
    const res = 'techops';
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    service.postDataV1(command);
    expect(httpClientSpy.post).toBeCalledTimes(1);
    
  });


});
