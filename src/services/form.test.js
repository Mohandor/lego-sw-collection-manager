
import { checkValidity, getFormIsValid, updateInput } from "./form";

describe('services/form', () => {
  describe('checkValidity', () => {
    it('should manage required rule', () => {
      expect(checkValidity('', {required: true})).toEqual({
        valid: false,
        errorText: 'This field is required'
      });
      expect(checkValidity(['tag1', 'tag2'], {required: true})).toEqual({
        valid: true,
        errorText: null
      });
    });
    it('should manage isAReference rule', () => {
      const rules = {
        required: true,
        isAReference: ['sw0001', 'sw0001a'],
        reference: 'sw0001'
      };
      expect(checkValidity('sw0001', rules)).toEqual({
        valid: true,
        errorText: null
      });
      expect(checkValidity('sw0001a', rules)).toEqual({
        valid: false,
        errorText: 'This minifig already exists in the database'
      });
      expect(checkValidity('test', rules)).toEqual({
        valid: false,
        errorText: 'This is not a minifig reference: sw[0-9]{4}[abcds]'
      });
    })
  });
  describe('getFormIsValid', () => {
    it('should return the form validity', () => {
      let template = {
        key1: {
          valid: true
        },
        key2: {
          valid: false
        }
      };
      expect(getFormIsValid(template)).toBeFalsy();
      template.key2.valid = true;
      expect(getFormIsValid(template)).toBeTruthy();
    });
  });
  describe('updateInput', () => {
    it('should update an input', () => {
      const state = {
        template: {
          key1: {
            value: '',
            valid: false,
            touched: false,
            errorText: null,
            validation: {
              required: true
            }
          }
        },
        formIsValid: false
      };
      const action = {
        value: 'test',
        inputKey: 'key1'
      };
      expect(updateInput(state, action)).toEqual({
        template: {
          key1: {
            ...state.template.key1,
            value: 'test',
            valid: true,
            touched: true
          }
        },
        formIsValid: true
      });
    });
  });
});