import React, { useEffect } from "react";
import {
  useShippingStore,
  type SelectedShippingOption,
} from "@/store/useShippingStore";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ShippingOptionSelectorProps {
  data?: string;
}

const ShippingOptionSelector: React.FC<ShippingOptionSelectorProps> = () => {
  const {
    vendors,
    isLoading,
    error,
    fetchVendors,
    selectedOption,
    setSelectedOption,
  } = useShippingStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (vendors.length === 0 && !isLoading && !error) {
      fetchVendors();
    }
  }, [vendors, isLoading, error, fetchVendors]);

  const handleOptionChange = (value: string) => {
    const [vendorIdStr, serviceIdStr] = value.split("-");
    const vendorId = parseInt(vendorIdStr);
    const serviceId = parseInt(serviceIdStr);

    const vendor = vendors.find((v) => v.id === vendorId);
    if (!vendor) {
      console.error("Vendor not found for ID:", vendorId);
      return;
    }

    const service = vendor.services.find((s) => s.id === serviceId);
    if (!service) {
      console.error("Service not found for ID:", serviceId);
      return;
    }

    const cost = parseFloat(service.base_rate);

    const newSelectedOption: SelectedShippingOption = {
      vendorId: vendor.id,
      vendorName: vendor.vendor_name,
      serviceId: service.id,
      serviceName: service.name,
      cost: cost,
      estimatedDays: service.estimated_days,
    };
    setSelectedOption(newSelectedOption);
    toast.success(
      `Shipping option selected: ${vendor.vendor_name} - ${service.name}`
    );
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg shadow-inner text-center text-gray-600">
        Loading shipping options...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg shadow-inner text-center text-red-700">
        Error: {error}
      </div>
    );
  }

  const isAddressComplete =
    user &&
    user.address_line &&
    user.city &&
    user.postal_code &&
    user.province &&
    user.phone_number;

  if (!user || !isAddressComplete) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg shadow-inner text-center text-yellow-700">
        Please complete your delivery address in your profile to see shipping
        options.
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg shadow-inner text-center text-gray-600">
        No shipping options available at the moment.
      </div>
    );
  }

  return (
    <RadioGroup
      value={
        selectedOption
          ? `${selectedOption.vendorId}-${selectedOption.serviceId}`
          : undefined
      }
      onValueChange={handleOptionChange}
      className="space-y-4"
    >
      {vendors.map((vendor) => (
        <div
          key={vendor.id}
          className="border border-gray-200 rounded-lg p-4 mb-0 bg-white shadow-sm"
        >
          <h4 className="font-bold text-gray-800 text-lg mb-3">
            {vendor.vendor_name}
          </h4>
          <div>
            {vendor.services.map((service) => {
              const uniqueId = `shipping-${vendor.id}-${service.id}`;
              return (
                <div key={uniqueId} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={`${vendor.id}-${service.id}`}
                    id={uniqueId}
                  />
                  <Label htmlFor={uniqueId} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">
                        {service.name}
                      </span>
                      <span className="text-gray-700 font-semibold">
                        Rp
                        {parseFloat(service.base_rate).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm block mt-0.5">
                      {service.estimated_days > 0
                        ? `Est. ${service.estimated_days} day${
                            service.estimated_days > 1 ? "s" : ""
                          }`
                        : "Same Day Delivery"}
                    </span>
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ShippingOptionSelector;
