/**
 * @fileOverview
 * Simple javascript implementation of the Service Locator.
 * Service Locator is a kind of dependency injection pattern.
 * The Service Locator pattern does not describe how to instantiate the services.
 * It describes a way to register services and locate them.
 * A Service Locator should be able to locate a service without knowing its concrete type.
 * For example, it might use a string key.
 * This allows you to replace the concrete implementation of the dependency without modifying the classes.
 */

import { IService } from '../database/service.interface';
import { EntityType } from './entity.interface';

/**
 * @class Describes a way to register services and locate them.
 * @name ServiceLocator
 */
export class ServiceLocator {
    /**
     * Services storage.
     * @private
     */
    private services = {};

    /**
     * Store service instance.
     * @function
     * @name ServiceLocator.register
     * @param {String} key Service instance identifier.
     * @param {Object} service Service instance.
     */
    register(key: EntityType, service: IService) {
        this.services[key] = service;
    }

    /**
     * Obtain service instance.
     * @function
     * @param {String} key Service instance identifier.
     * @returns {Object} Service instance.
     */
    resolve(key: EntityType): IService {
        return this.services[key];
    }

    /**
     * Clear services storage.
     * @function
     */
    reset() {
        this.services = {};
    }
};