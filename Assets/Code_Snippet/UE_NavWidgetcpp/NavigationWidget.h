// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "NavigationWidget.generated.h"

/**
 * 
 */
UCLASS()
class GAMEDEVMECHPROJECT_API UNavigationWidget : public UUserWidget
{
	GENERATED_BODY()
private:
	UWidget* ActiveWidget; //Current widget user is on
	UWidget* LastWidget; // The last widget user was on
	//Is the UI Being Controlled by mouse rn
	bool _Enabled;
	bool _MouseMode = false;
	void _UpdateLook();
	void _SetWidgetColor(UWidget* TargetWidget, FSlateColor Color);
	// Revent style of widget element to default style
	void _ResetWidgetStyle(UWidget* TargetWidget);
	void _NavigateWithKey(FKey InputKey);
	//Call button event when user has selected the element
	void _SelectWithKey(FKey InputKey);

public:
	UPROPERTY(BlueprintReadWrite, EditAnywhere)
	FSlateColor NormalColor = FSlateColor(FLinearColor(0,0,0,1));

	UPROPERTY(BlueprintReadWrite, EditAnywhere)
	FSlateColor ActiveColor = FSlateColor(FLinearColor(0, 0.5, 0, 1));

	//Enable or Disable navigation on widget
	UFUNCTION(BlueprintCallable, Category = Default)
	void ToggleNavigation(bool Enable);

	//Move Focus to New Navigation Widget
	UFUNCTION(BlueprintCallable, Category = Default)
	void SwitchToNavWidget(UNavigationWidget* NewWidget);

	// Set The Active Widget
	UFUNCTION(BlueprintCallable, Category = Default)
	void SetActiveWidget(UWidget* NewWidget);

	//Events
	UFUNCTION(BlueprintImplementableEvent, Category = Default)
	void NavWidgetOnGetFocus();
	
	UFUNCTION(BlueprintImplementableEvent, Category = Default)
	void NavWidgetOnKeyDown(FKey InputKey);

	// When a Back key (Esc, Xbox[B]) is pressed
	UFUNCTION(BlueprintImplementableEvent, Category = Default)
	void NavWidgetOnBackKey();

	UFUNCTION(BlueprintImplementableEvent, Category = Default)
	void NavWidgetOnNavigation();

	UFUNCTION(BlueprintImplementableEvent, Category = Default)
	void NavWidgetOnMouseDown(FPointerEvent PointerEvent);
	
	// Function Overrides 
	virtual void NativeTick(
		const FGeometry& MyGeometry,
		float InDeltaTime
	)override;

protected:
	virtual FReply NativeOnKeyDown(
		const FGeometry& InGeometry,
		const FKeyEvent& InKeyEvent
	)override;

	virtual FReply NativeOnMouseMove
	(
		const FGeometry& InGeometry,
		const FPointerEvent& InMouseEvent
	)override;

	virtual FReply NativeOnMouseButtonDown
	(
		const FGeometry& InGeometry,
		const FPointerEvent& InMouseEvent
	)override;

};
