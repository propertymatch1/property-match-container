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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <DialogTitle className="text-xl">Profile Complete!</DialogTitle>
          </div>
          <DialogDescription>
            Here's a summary of your tenant profile. Review the details and complete your setup.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Business Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Business Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
              {profileData.brandName && (
                <div>
                  <p className="text-sm text-muted-foreground">Brand Name</p>
                  <p className="font-medium">{profileData.brandName}</p>
                </div>
              )}
              {profileData.industry && (
                <div>
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p className="font-medium">{profileData.industry}</p>
                </div>
              )}
              {profileData.tennentExperience && (
                <div>
                  <p className="text-sm text-muted-foreground">Experience Level</p>
                  <p className="font-medium">{profileData.tennentExperience}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Space Requirements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">Space Requirements</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
              {profileData.spaceLooking && profileData.spaceLooking.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Space Types</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profileData.spaceLooking.map((space, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {space}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {profileData.spaceNeed && (
                <div>
                  <p className="text-sm text-muted-foreground">Size Needed</p>
                  <p className="font-medium">{profileData.spaceNeed} sq ft</p>
                </div>
              )}
              {profileData.cityNext && profileData.cityNext.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Target Cities</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profileData.cityNext.map((city, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {profileData.whenNextOpen && (
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="font-medium">{profileData.whenNextOpen}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Financial Info */}
          {profileData.rentRangeDesire && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">Budget</h3>
                </div>
                <div className="pl-7">
                  <p className="text-sm text-muted-foreground">Rent Budget</p>
                  <p className="font-medium">${profileData.rentRangeDesire}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Customer Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">Target Customers</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
              {profileData.typcialCustomer && profileData.typcialCustomer.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Customer Types</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profileData.typcialCustomer.map((customer, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {customer}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {profileData.typcialCustomerSpend && (
                <div>
                  <p className="text-sm text-muted-foreground">Average Spending</p>
                  <p className="font-medium">{profileData.typcialCustomerSpend}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Brand Personality */}
          {profileData.personalityTags && profileData.personalityTags.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Brand Personality</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.personalityTags.map((trait, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Additional Notes */}
          {profileData.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">Additional Notes</h3>
                <p className="text-sm text-muted-foreground">{profileData.notes}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={onComplete} 
            disabled={isSubmitting}
            className="min-w-[140px]"
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