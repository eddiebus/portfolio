// Fill out your copyright notice in the Description page of Project Settings.


#include "NavigationWidget.h"
#include "Components/Button.h"
#include "Components/WidgetInteractionComponent.h"
#include "Components/Slider.h"

void UNavigationWidget::_UpdateLook()
{
	//Not in mouse mode. Set custom appearance
	if (_MouseMode == false) {
		if (!ActiveWidget->IsValidLowLevel()) {
			return;
		}
		else {
			_SetWidgetColor(ActiveWidget, ActiveColor);

			if (LastWidget->IsValidLowLevel()) {
				_ResetWidgetStyle(LastWidget);
			}
		}
	}
	// Widget is in mouse mode. Revert looks
	else {
		_ResetWidgetStyle(ActiveWidget);
		_ResetWidgetStyle(LastWidget);
	}
}

void UNavigationWidget::_SetWidgetColor(UWidget* TargetWidget, FSlateColor Color)
{
	//No widget is in focus. Do nothing
	if (!ActiveWidget->IsValidLowLevel()) {
		return;
	}

	//Find what supported type of widget is active
	UButton* ButtonWidget = Cast<UButton>(TargetWidget);
	USlider* SliderWidget = Cast<USlider>(TargetWidget);
	if (ButtonWidget) {
		FButtonStyle NewStyle = ButtonWidget->WidgetStyle;
		NewStyle.Normal.TintColor = Color;
		NewStyle.Hovered.TintColor = Color;
		NewStyle.Pressed.TintColor = Color;
		ButtonWidget->SetStyle(NewStyle);
	}

	if (SliderWidget) {
		FSlateBrush NewThumbImage = SliderWidget->WidgetStyle.NormalThumbImage;
		NewThumbImage.TintColor = ActiveColor;
		SliderWidget->WidgetStyle.SetNormalThumbImage(NewThumbImage);
		SliderWidget->WidgetStyle.SetHoveredThumbImage(NewThumbImage);
	}
}

void UNavigationWidget::_ResetWidgetStyle(UWidget* TargetWidget)
{
	//Find what supported type of widget is active
	UButton* ButtonWidget = Cast<UButton>(TargetWidget);
	USlider* SliderWidget = Cast<USlider>(TargetWidget);
	if (ButtonWidget) {
		FButtonStyle NewStyle = ButtonWidget->WidgetStyle;
		NewStyle.Normal.TintColor = NormalColor;
		NewStyle.Hovered.TintColor = ActiveColor;
		NewStyle.Pressed.TintColor = NormalColor;
		ButtonWidget->SetStyle(NewStyle);
	}
	else if (SliderWidget) {
		FSlateBrush NewThumbImage = SliderWidget->WidgetStyle.NormalThumbImage;
		NewThumbImage.TintColor = FSlateColor(FLinearColor::White);
		SliderWidget->WidgetStyle.SetNormalThumbImage(NewThumbImage);
		SliderWidget->WidgetStyle.SetHoveredThumbImage(NewThumbImage);
		SliderWidget->SetIsEnabled(true);
	}
}

void UNavigationWidget::_NavigateWithKey(FKey InputKey)
{
	// Only function with valid Widget and navigation
	if (!ActiveWidget->IsValidLowLevel()) {
		return;
	}
	else if (!ActiveWidget->Navigation->IsValidLowLevel()) {
		return;
	}
	UWidgetNavigation* WidgetNav = ActiveWidget->Navigation;

	USlider* SliderWidget = Cast<USlider>(ActiveWidget);
	if (SliderWidget) {
		if (SliderWidget->Orientation == EOrientation::Orient_Horizontal) {
			if (InputKey == EKeys::Down || InputKey == EKeys::S || InputKey == EKeys::Gamepad_DPad_Down) {
				if (WidgetNav->Down.Rule == EUINavigationRule::Explicit) {
					SetActiveWidget(WidgetNav->Down.Widget.Get());
					NavWidgetOnNavigation();
				}
			}
			else if (InputKey == EKeys::Up || InputKey == EKeys::W || InputKey == EKeys::Gamepad_DPad_Up) {
				if (WidgetNav->Up.Rule == EUINavigationRule::Explicit) {
					SetActiveWidget(WidgetNav->Up.Widget.Get());
					NavWidgetOnNavigation();
				}
			}
			float stepValue = 0.05f;
			if (InputKey == EKeys::Left || InputKey == EKeys::A || InputKey == EKeys::Gamepad_DPad_Left) {
				SliderWidget->SetValue(FMath::Clamp(SliderWidget->Value - stepValue,0,1));
				SliderWidget->OnValueChanged.Broadcast(SliderWidget->Value);
			}
			else if (InputKey == EKeys::Right || InputKey == EKeys::D || InputKey == EKeys::Gamepad_DPad_Right) {
				SliderWidget->SetValue(FMath::Clamp(SliderWidget->Value + stepValue,0,1));
				SliderWidget->OnValueChanged.Broadcast(SliderWidget->Value);
			}
		}

		return;
	}

	//Check input and move appropriately
	if (InputKey == EKeys::Down || InputKey == EKeys::S || InputKey == EKeys::Gamepad_DPad_Down) {
		if (WidgetNav->Down.Rule == EUINavigationRule::Explicit) {
			SetActiveWidget(WidgetNav->Down.Widget.Get());
			NavWidgetOnNavigation();
		}
	}
	else if (InputKey == EKeys::Up || InputKey == EKeys::W || InputKey == EKeys::Gamepad_DPad_Up) {
		if (WidgetNav->Up.Rule == EUINavigationRule::Explicit) {
			SetActiveWidget(WidgetNav->Up.Widget.Get());
			NavWidgetOnNavigation();
		}
	}
	else if (InputKey == EKeys::Left || InputKey == EKeys::A || InputKey == EKeys::Gamepad_DPad_Left) {
		if (WidgetNav->Left.Rule == EUINavigationRule::Explicit) {
			SetActiveWidget(WidgetNav->Up.Widget.Get());
			NavWidgetOnNavigation();
		}
	}
	else if (InputKey == EKeys::Right || InputKey == EKeys::D || InputKey == EKeys::Gamepad_DPad_Right) {
		if (WidgetNav->Right.Rule == EUINavigationRule::Explicit) {
			SetActiveWidget(WidgetNav->Up.Widget.Get());
			NavWidgetOnNavigation();
		}
	}


}

void UNavigationWidget::_SelectWithKey(FKey InputKey)
{
	if (!ActiveWidget->IsValidLowLevel() || _Enabled == false) {
		return;
	}
	UButton* WidgetButton = Cast<UButton>(ActiveWidget);
	if (WidgetButton) {
		if (InputKey == EKeys::Enter || InputKey == EKeys::Gamepad_FaceButton_Bottom) {
			WidgetButton->OnPressed.Broadcast();
		}
	}
}

void UNavigationWidget::ToggleNavigation(bool Enable)
{
	_Enabled = Enable;
}

void UNavigationWidget::SwitchToNavWidget(UNavigationWidget* NewWidget)
{
	APlayerController* myPlayerController = this->GetOwningPlayer();
	if (!NewWidget->IsValidLowLevel() || !myPlayerController->IsValidLowLevel() || !this->IsValidLowLevel()) {
		return;
	}
	// Handle player controller focus
	NewWidget->SetOwningPlayer(myPlayerController);
	FInputModeUIOnly inputMode = FInputModeUIOnly();
	inputMode.SetWidgetToFocus(NewWidget->GetCachedWidget());
	myPlayerController->SetInputMode(inputMode);
	NewWidget->bIsFocusable = true;
	
	//Disable the Widget we are leaving. Activate the widget we are entering
	ToggleNavigation(false);
	NewWidget->ToggleNavigation(true);
	NewWidget->SetFocus();
	NewWidget->NavWidgetOnGetFocus();
}

void UNavigationWidget::SetActiveWidget(UWidget* NewWidget)
{
	if (NewWidget->IsValidLowLevel() && NewWidget != ActiveWidget) {
		LastWidget = ActiveWidget;
		ActiveWidget = NewWidget;
	}
}

FReply UNavigationWidget::NativeOnKeyDown(const FGeometry& InGeometry, const FKeyEvent& InKeyEvent)
{
	//Do not handling a repeat key. We aint typing
	//Off MouseMode
	_MouseMode = false;

	if (_Enabled == true) {
		if (!InKeyEvent.IsRepeat()) {
			_SelectWithKey(InKeyEvent.GetKey());
		}
		_NavigateWithKey(InKeyEvent.GetKey());
	}

	FKey InputKey = InKeyEvent.GetKey();
	if (InputKey == EKeys::Gamepad_FaceButton_Right || InputKey == EKeys::Escape) {
		NavWidgetOnBackKey();
	}
	//Call Blueprint Event
	NavWidgetOnKeyDown(InKeyEvent.GetKey());

	return FReply::Handled();
}

FReply UNavigationWidget::NativeOnMouseMove(const FGeometry& InGeometry, const FPointerEvent& InMouseEvent)
{
	if (InMouseEvent.GetCursorDelta().Size() > 2) {
		_MouseMode = true;
		_ResetWidgetStyle(ActiveWidget);
		_ResetWidgetStyle(LastWidget);
	}

	return UUserWidget::NativeOnMouseMove(InGeometry, InMouseEvent);
	return FReply::Handled();
}

FReply UNavigationWidget::NativeOnMouseButtonDown(const FGeometry& InGeometry, const FPointerEvent& InMouseEvent)
{
	NavWidgetOnMouseDown(InMouseEvent);
	return FReply::Handled();
}

void UNavigationWidget::NativeTick(const FGeometry& MyGeometry, float InDeltaTime)
{
	UUserWidget::NativeTick(MyGeometry, InDeltaTime);
	bIsFocusable = true;
	_UpdateLook();
	if (_Enabled) {
		this->SetFocus();
	}
}
