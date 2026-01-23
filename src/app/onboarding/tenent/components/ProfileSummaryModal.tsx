import React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { CheckCircle, Building, Users, MapPin, DollarSign } from "lucide-react";
import type { ProfileData } from "../types";

interface ProfileSummaryModalProps {
  isOpen: boolean;
  profileData: ProfileData;
  isSubmitting: boolean;
  onComplete: () => void;
  onClose?: (open: boolean) => void;
}

export const ProfileSummaryModal: React.FC<ProfileSummaryModalProps> = ({
  isOpen,
  profileData,
  isSubmitting,
  onComplete,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-[var(--sage-500)]" />
            <DialogTitle className="font-[var(--font-playfair)] text-xl tracking-tight text-[var(--warm-900)]">
              Profile Complete!
            </DialogTitle>
          </div>
          <DialogDescription className="text-[var(--warm-600)]">
            Here's a summary of your tenant profile. Review the details and complete your setup.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Business Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-[var(--sage-500)]" />
              <h3 className="font-semibold text-[var(--warm-900)]">Business Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
              {profileData.brandName && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Brand Name</p>
                  <p className="font-medium text-[var(--warm-900)]">{profileData.brandName}</p>
                </div>
              )}
              {profileData.industry && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Industry</p>
                  <p className="font-medium text-[var(--warm-900)]">{profileData.industry}</p>
                </div>
              )}
              {profileData.tennentExperience && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Experience Level</p>
                  <p className="font-medium text-[var(--warm-900)]">{profileData.tennentExperience}</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-[var(--warm-200)]" />

          {/* Space Requirements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[var(--sage-500)]" />
              <h3 className="font-semibold text-[var(--warm-900)]">Space Requirements</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
              {profileData.spaceLooking && profileData.spaceLooking.length > 0 && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Space Types</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profileData.spaceLooking.map((space, index) => (
                      <Badge key={index} variant="secondary" className="bg-[var(--sage-100)] text-[var(--sage-700)] text-xs">
                        {space}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {profileData.spaceNeed && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Size Needed</p>
                  <p className="font-medium text-[var(--warm-900)]">{profileData.spaceNeed} sq ft</p>
                </div>
              )}
              {profileData.cityNext && profileData.cityNext.length > 0 && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Target Cities</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profileData.cityNext.map((city, index) => (
                      <Badge key={index} variant="outline" className="border-[var(--warm-300)] text-[var(--warm-700)] text-xs">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {profileData.whenNextOpen && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Timeline</p>
                  <p className="font-medium text-[var(--warm-900)]">{profileData.whenNextOpen}</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-[var(--warm-200)]" />

          {/* Financial Info */}
          {profileData.rentRangeDesire && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[var(--gold-500)]" />
                  <h3 className="font-semibold text-[var(--warm-900)]">Budget</h3>
                </div>
                <div className="pl-7">
                  <p className="text-sm text-[var(--warm-600)]">Rent Budget</p>
                  <p className="font-medium text-[var(--warm-900)]">${profileData.rentRangeDesire}</p>
                </div>
              </div>
              <Separator className="bg-[var(--warm-200)]" />
            </>
          )}

          {/* Customer Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[var(--sage-500)]" />
              <h3 className="font-semibold text-[var(--warm-900)]">Target Customers</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
              {profileData.typcialCustomer && profileData.typcialCustomer.length > 0 && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Customer Types</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profileData.typcialCustomer.map((customer, index) => (
                      <Badge key={index} variant="secondary" className="bg-[var(--sage-100)] text-[var(--sage-700)] text-xs">
                        {customer}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {profileData.typcialCustomerSpend && (
                <div>
                  <p className="text-sm text-[var(--warm-600)]">Average Spending</p>
                  <p className="font-medium text-[var(--warm-900)]">{profileData.typcialCustomerSpend}</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-[var(--warm-200)]" />

          {/* Brand Personality */}
          {profileData.personalityTags && profileData.personalityTags.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-[var(--warm-900)]">Brand Personality</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.personalityTags.map((trait, index) => (
                  <Badge key={index} variant="default" className="bg-[var(--sage-500)] text-white text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Additional Notes */}
          {profileData.notes && (
            <>
              <Separator className="bg-[var(--warm-200)]" />
              <div className="space-y-2">
                <h3 className="font-semibold text-[var(--warm-900)]">Additional Notes</h3>
                <p className="text-sm text-[var(--warm-600)]">{profileData.notes}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={onComplete} 
            disabled={isSubmitting}
            className="min-h-[44px] min-w-[140px] bg-[var(--sage-500)] text-white hover:bg-[var(--sage-600)]"
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              "Complete Profile"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};